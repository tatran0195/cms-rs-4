use std::collections::HashMap;
use std::sync::Arc;
use serde::Serialize;
use tokio::sync::{RwLock, broadcast};
use uuid::Uuid;

const CHANNEL_CAP: usize = 256;

#[derive(Debug, Clone, Copy, Serialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum EventScope {
    Inbox,
    Board,
}

#[derive(Debug, Clone, Serialize)]
pub struct NotificationEvent {
    pub id: Uuid,
    pub tenant_id: Uuid,
    pub kind: String,
    pub title: String,
    pub body: Option<String>,
    pub category: Option<String>,
    pub entity_type: Option<String>,
    pub entity_id: Option<Uuid>,
    pub action_url: Option<String>,
    pub scope: EventScope,
}

#[must_use]
pub fn user_topic(user_id: Uuid) -> String {
    format!("user:{user_id}")
}

#[must_use]
pub fn site_topic(site_id: Uuid) -> String {
    format!("site:{site_id}")
}

#[derive(Clone, Default)]
pub struct NotificationHub {
    topics: Arc<RwLock<HashMap<String, broadcast::Sender<Arc<NotificationEvent>>>>>,
}

impl std::fmt::Debug for NotificationHub {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("NotificationHub").finish_non_exhaustive()
    }
}

impl NotificationHub {
    #[must_use]
    pub fn new() -> Self {
        Self::default()
    }

    pub async fn subscribe(&self, topic: &str) -> broadcast::Receiver<Arc<NotificationEvent>> {
        let mut topics = self.topics.write().await;
        topics
            .entry(topic.to_owned())
            .or_insert_with(|| broadcast::channel(CHANNEL_CAP).0)
            .subscribe()
    }

    pub async fn publish(&self, topics: &[String], event: NotificationEvent) {
        let shared = Arc::new(event);
        let mut dead: Vec<String> = Vec::new();
        {
            let map = self.topics.read().await;
            for topic in topics {
                if let Some(sender) = map.get(topic) {
                    if sender.receiver_count() == 0 {
                        dead.push(topic.clone());
                    } else {
                        let _ = sender.send(Arc::clone(&shared));
                    }
                }
            }
        }
        if !dead.is_empty() {
            let mut map = self.topics.write().await;
            for topic in dead {
                if map.get(&topic).is_some_and(|s| s.receiver_count() == 0) {
                    map.remove(&topic);
                }
            }
        }
    }

    pub async fn topic_count(&self) -> usize {
        self.topics.read().await.len()
    }
}
