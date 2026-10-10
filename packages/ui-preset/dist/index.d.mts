//#region src/constants.d.ts
export declare const FONT_FAMILY_SANS: string[];
export declare const FONT_FAMILY_MONO: string[];
//#endregion
//#region src/theme/extension/theme.d.ts
export declare const theme: {
  extend: {
    colors: {
      ui: {
        tag: {
          neutral: {
            border: {
              DEFAULT: string;
            };
            icon: {
              DEFAULT: string;
            };
            text: {
              DEFAULT: string;
            };
            bg: {
              hover: {
                DEFAULT: string;
              };
              DEFAULT: string;
            };
          };
          red: {
            text: {
              DEFAULT: string;
            };
            bg: {
              DEFAULT: string;
              hover: {
                DEFAULT: string;
              };
            };
            border: {
              DEFAULT: string;
            };
            icon: {
              DEFAULT: string;
            };
          };
          blue: {
            text: {
              DEFAULT: string;
            };
            border: {
              DEFAULT: string;
            };
            bg: {
              DEFAULT: string;
              hover: {
                DEFAULT: string;
              };
            };
            icon: {
              DEFAULT: string;
            };
          };
          orange: {
            text: {
              DEFAULT: string;
            };
            border: {
              DEFAULT: string;
            };
            icon: {
              DEFAULT: string;
            };
            bg: {
              hover: {
                DEFAULT: string;
              };
              DEFAULT: string;
            };
          };
          green: {
            icon: {
              DEFAULT: string;
            };
            border: {
              DEFAULT: string;
            };
            text: {
              DEFAULT: string;
            };
            bg: {
              hover: {
                DEFAULT: string;
              };
              DEFAULT: string;
            };
          };
          purple: {
            bg: {
              DEFAULT: string;
              hover: {
                DEFAULT: string;
              };
            };
            text: {
              DEFAULT: string;
            };
            icon: {
              DEFAULT: string;
            };
            border: {
              DEFAULT: string;
            };
          };
        };
        bg: {
          switch: {
            off: {
              hover: {
                DEFAULT: string;
              };
              DEFAULT: string;
            };
          };
          subtle: {
            hover: {
              DEFAULT: string;
            };
            DEFAULT: string;
            pressed: {
              DEFAULT: string;
            };
          };
          field: {
            component: {
              hover: {
                DEFAULT: string;
              };
              DEFAULT: string;
            };
            DEFAULT: string;
            hover: {
              DEFAULT: string;
            };
          };
          base: {
            pressed: {
              DEFAULT: string;
            };
            hover: {
              DEFAULT: string;
            };
            DEFAULT: string;
          };
          highlight: {
            DEFAULT: string;
            hover: {
              DEFAULT: string;
            };
          };
          component: {
            pressed: {
              DEFAULT: string;
            };
            DEFAULT: string;
            hover: {
              DEFAULT: string;
            };
          };
          interactive: {
            DEFAULT: string;
          };
          disabled: {
            DEFAULT: string;
          };
          overlay: {
            DEFAULT: string;
          };
        };
        border: {
          menu: {
            bot: {
              DEFAULT: string;
            };
            top: {
              DEFAULT: string;
            };
          };
          strong: {
            DEFAULT: string;
          };
          interactive: {
            DEFAULT: string;
          };
          base: {
            DEFAULT: string;
          };
          danger: {
            DEFAULT: string;
          };
          error: {
            DEFAULT: string;
          };
          transparent: {
            DEFAULT: string;
          };
        };
        contrast: {
          fg: {
            primary: {
              DEFAULT: string;
            };
            secondary: {
              DEFAULT: string;
            };
          };
          bg: {
            base: {
              pressed: {
                DEFAULT: string;
              };
              DEFAULT: string;
              hover: {
                DEFAULT: string;
              };
            };
            subtle: {
              DEFAULT: string;
            };
          };
          border: {
            base: {
              DEFAULT: string;
            };
            bot: {
              DEFAULT: string;
            };
            top: {
              DEFAULT: string;
            };
          };
        };
        button: {
          inverted: {
            pressed: {
              DEFAULT: string;
            };
            hover: {
              DEFAULT: string;
            };
            DEFAULT: string;
          };
          transparent: {
            DEFAULT: string;
            hover: {
              DEFAULT: string;
            };
            pressed: {
              DEFAULT: string;
            };
          };
          danger: {
            pressed: {
              DEFAULT: string;
            };
            DEFAULT: string;
            hover: {
              DEFAULT: string;
            };
          };
          neutral: {
            DEFAULT: string;
            hover: {
              DEFAULT: string;
            };
            pressed: {
              DEFAULT: string;
            };
          };
        };
        fg: {
          on: {
            color: {
              DEFAULT: string;
            };
            inverted: {
              DEFAULT: string;
            };
          };
          interactive: {
            hover: {
              DEFAULT: string;
            };
            DEFAULT: string;
          };
          error: {
            DEFAULT: string;
          };
          subtle: {
            DEFAULT: string;
          };
          base: {
            DEFAULT: string;
          };
          disabled: {
            DEFAULT: string;
          };
          muted: {
            DEFAULT: string;
          };
        };
        alpha: {
          '250': {
            DEFAULT: string;
          };
          '400': {
            DEFAULT: string;
          };
        };
      };
    };
    boxShadow: {
      'buttons-danger-focus': string;
      'details-contrast-on-bg-interactive': string;
      'borders-error': string;
      'borders-focus': string;
      'buttons-danger': string;
      'buttons-inverted-focus': string;
      'elevation-card-hover': string;
      'details-switch-handle': string;
      'buttons-neutral': string;
      'borders-base': string;
      'elevation-card-rest': string;
      'buttons-neutral-focus': string;
      'details-switch-background-focus': string;
      'details-switch-background': string;
      'elevation-flyout': string;
      'elevation-tooltip': string;
      'elevation-modal': string;
      'elevation-code-block': string;
      'buttons-inverted': string;
      'elevation-commandbar': string;
      'borders-interactive-with-focus': string;
      'borders-interactive-with-shadow': string;
      'borders-interactive-with-active': string;
    };
  };
};
//#endregion
//#region src/theme/tokens/colors.d.ts
export declare const colors: {
  dark: {
    '--button-danger-pressed': string;
    '--bg-base-pressed': string;
    '--bg-component-hover': string;
    '--border-interactive': string;
    '--button-neutral': string;
    '--tag-orange-border': string;
    '--tag-blue-text': string;
    '--bg-highlight': string;
    '--tag-neutral-icon': string;
    '--bg-switch-off-hover': string;
    '--fg-on-color': string;
    '--button-inverted-pressed': string;
    '--fg-interactive-hover': string;
    '--fg-error': string;
    '--bg-switch-off': string;
    '--border-strong': string;
    '--border-error': string;
    '--fg-subtle': string;
    '--bg-highlight-hover': string;
    '--button-inverted': string;
    '--tag-orange-text': string;
    '--fg-base': string;
    '--fg-disabled': string;
    '--button-danger': string;
    '--tag-neutral-border': string;
    '--tag-blue-border': string;
    '--tag-neutral-text': string;
    '--tag-purple-border': string;
    '--tag-green-text': string;
    '--button-inverted-hover': string;
    '--bg-component-pressed': string;
    '--contrast-border-bot': string;
    '--tag-blue-icon': string;
    '--bg-field': string;
    '--tag-neutral-bg': string;
    '--tag-green-border': string;
    '--tag-red-icon': string;
    '--tag-red-text': string;
    '--tag-purple-icon': string;
    '--bg-interactive': string;
    '--bg-field-hover': string;
    '--border-transparent': string;
    '--tag-orange-icon': string;
    '--tag-purple-bg': string;
    '--bg-base-hover': string;
    '--tag-blue-bg': string;
    '--tag-green-bg': string;
    '--tag-purple-text': string;
    '--tag-red-border': string;
    '--border-danger': string;
    '--tag-green-icon': string;
    '--tag-red-bg': string;
    '--fg-interactive': string;
    '--tag-orange-bg': string;
    '--button-danger-hover': string;
    '--bg-component': string;
    '--bg-disabled': string;
    '--button-transparent': string;
    '--border-menu-bot': string;
    '--tag-purple-bg-hover': string;
    '--tag-orange-bg-hover': string;
    '--tag-blue-bg-hover': string;
    '--tag-red-bg-hover': string;
    '--tag-green-bg-hover': string;
    '--border-menu-top': string;
    '--bg-base': string;
    '--contrast-border-top': string;
    '--bg-field-component': string;
    '--bg-subtle-hover': string;
    '--bg-subtle': string;
    '--fg-on-inverted': string;
    '--bg-overlay': string;
    '--button-transparent-hover': string;
    '--contrast-fg-secondary': string;
    '--contrast-border-base': string;
    '--contrast-bg-base-pressed': string;
    '--button-neutral-pressed': string;
    '--border-base': string;
    '--contrast-fg-primary': string;
    '--button-neutral-hover': string;
    '--contrast-bg-base': string;
    '--tag-neutral-bg-hover': string;
    '--contrast-bg-subtle': string;
    '--contrast-bg-base-hover': string;
    '--bg-field-component-hover': string;
    '--bg-subtle-pressed': string;
    '--button-transparent-pressed': string;
    '--fg-muted': string;
    '--alpha-400': string;
    '--alpha-250': string;
  };
  light: {
    '--tag-neutral-border': string;
    '--tag-neutral-icon': string;
    '--bg-switch-off-hover': string;
    '--border-menu-bot': string;
    '--border-menu-top': string;
    '--bg-subtle-hover': string;
    '--contrast-fg-primary': string;
    '--bg-switch-off': string;
    '--contrast-bg-base-pressed': string;
    '--bg-field-component-hover': string;
    '--bg-base-pressed': string;
    '--tag-neutral-text': string;
    '--tag-red-text': string;
    '--contrast-bg-base': string;
    '--border-strong': string;
    '--contrast-border-base': string;
    '--bg-field': string;
    '--tag-blue-text': string;
    '--button-inverted-pressed': string;
    '--border-interactive': string;
    '--bg-base-hover': string;
    '--contrast-bg-subtle': string;
    '--bg-highlight': string;
    '--contrast-fg-secondary': string;
    '--tag-red-bg': string;
    '--button-transparent': string;
    '--button-danger-pressed': string;
    '--fg-on-color': string;
    '--button-inverted-hover': string;
    '--bg-field-component': string;
    '--tag-orange-text': string;
    '--tag-green-icon': string;
    '--border-base': string;
    '--bg-base': string;
    '--tag-orange-border': string;
    '--tag-red-border': string;
    '--tag-green-border': string;
    '--tag-green-text': string;
    '--button-neutral': string;
    '--tag-blue-border': string;
    '--fg-interactive-hover': string;
    '--tag-orange-icon': string;
    '--button-neutral-hover': string;
    '--fg-interactive': string;
    '--bg-component-pressed': string;
    '--tag-purple-bg': string;
    '--contrast-bg-base-hover': string;
    '--bg-component': string;
    '--bg-subtle': string;
    '--tag-purple-text': string;
    '--contrast-border-bot': string;
    '--button-inverted': string;
    '--tag-red-icon': string;
    '--button-transparent-hover': string;
    '--button-neutral-pressed': string;
    '--tag-purple-icon': string;
    '--bg-field-hover': string;
    '--fg-on-inverted': string;
    '--bg-interactive': string;
    '--border-danger': string;
    '--button-transparent-pressed': string;
    '--tag-purple-border': string;
    '--bg-highlight-hover': string;
    '--border-error': string;
    '--button-danger': string;
    '--tag-blue-bg': string;
    '--border-transparent': string;
    '--button-danger-hover': string;
    '--bg-subtle-pressed': string;
    '--fg-error': string;
    '--bg-component-hover': string;
    '--bg-disabled': string;
    '--tag-blue-icon': string;
    '--fg-subtle': string;
    '--tag-orange-bg-hover': string;
    '--tag-green-bg-hover': string;
    '--tag-red-bg-hover': string;
    '--tag-purple-bg-hover': string;
    '--tag-neutral-bg-hover': string;
    '--tag-blue-bg-hover': string;
    '--tag-green-bg': string;
    '--tag-neutral-bg': string;
    '--tag-orange-bg': string;
    '--fg-base': string;
    '--contrast-border-top': string;
    '--bg-overlay': string;
    '--fg-disabled': string;
    '--fg-muted': string;
    '--alpha-250': string;
    '--alpha-400': string;
  };
};
//#endregion
//#region src/theme/tokens/effects.d.ts
export declare const effects: {
  dark: {
    '--details-contrast-on-bg-interactive': string;
    '--details-switch-handle': string;
    '--borders-interactive-with-active': string;
    '--borders-focus': string;
    '--details-switch-background-focus': string;
    '--buttons-danger': string;
    '--buttons-danger-focus': string;
    '--details-switch-background': string;
    '--buttons-inverted-focus': string;
    '--elevation-flyout': string;
    '--borders-error': string;
    '--buttons-inverted': string;
    '--borders-base': string;
    '--elevation-card-hover': string;
    '--elevation-card-rest': string;
    '--buttons-neutral': string;
    '--elevation-code-block': string;
    '--buttons-neutral-focus': string;
    '--elevation-modal': string;
    '--elevation-commandbar': string;
    '--elevation-tooltip': string;
    '--borders-interactive-with-focus': string;
    '--borders-interactive-with-shadow': string;
  };
  light: {
    '--buttons-danger-focus': string;
    '--details-contrast-on-bg-interactive': string;
    '--borders-error': string;
    '--borders-focus': string;
    '--buttons-danger': string;
    '--buttons-inverted-focus': string;
    '--elevation-card-hover': string;
    '--details-switch-handle': string;
    '--buttons-neutral': string;
    '--borders-base': string;
    '--elevation-card-rest': string;
    '--buttons-neutral-focus': string;
    '--details-switch-background-focus': string;
    '--details-switch-background': string;
    '--elevation-flyout': string;
    '--elevation-tooltip': string;
    '--elevation-modal': string;
    '--elevation-code-block': string;
    '--buttons-inverted': string;
    '--elevation-commandbar': string;
    '--borders-interactive-with-focus': string;
    '--borders-interactive-with-shadow': string;
    '--borders-interactive-with-active': string;
  };
};
//#endregion
//#region src/theme/tokens/typography.d.ts
export declare const typography: {
  '.h1-webs': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.h2-webs': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.h3-webs': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.txt-compact-xlarge-plus': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.txt-compact-xsmall': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.txt-compact-xsmall-plus': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.txt-compact-small-plus': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.txt-compact-medium': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.txt-compact-large-plus': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.txt-compact-large': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.txt-compact-medium-plus': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.txt-compact-xlarge': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.txt-compact-small': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.h4-webs': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.h2-core': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.h3-core': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.h1-core': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.h1-docs': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.h4-docs': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.code-label-plus': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.code-label': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.code-paragraph': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.code-paragraph-plus': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.txt-xsmall-plus': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.txt-small': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.h2-docs': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.txt-medium': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.txt-small-plus': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.txt-large': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.txt-medium-plus': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.txt-xsmall': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.h3-docs': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.txt-xlarge-plus': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.txt-large-plus': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
  '.txt-xlarge': {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    fontFamily: string;
  };
};
//#endregion
//# sourceMappingURL=index.d.mts.map