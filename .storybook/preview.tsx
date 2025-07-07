import type { Preview } from "@storybook/react";
import React from "react";
import "../src/app/globals.css";
import { ThemeProvider } from "../src/components/ThemeProvider";
import * as ReactDOMLegacy from 'react-dom';
import { createRoot } from 'react-dom/client';
// Using `any` to avoid dependency on Storybook's internal ArgTypesEnhancer typings,
// which may not be installed. This keeps the code simple and compatible.

const rootMap = new WeakMap<Element, any>();
// Polyfill render for React 19
// @ts-expect-error augment legacy api
if (!ReactDOMLegacy.render) {
  // eslint-disable-next-line no-param-reassign
  // @ts-ignore
  ReactDOMLegacy.render = (element: React.ReactNode, container: Element, callback?: () => void) => {
    let root = rootMap.get(container);
    if (!root) {
      root = createRoot(container);
      rootMap.set(container, root);
    }
    root.render(element as any);
    if (callback) callback();
    return root;
  };
}

// Update unmount to use existing root
// @ts-expect-error legacy
const originalUnmount = ReactDOMLegacy.unmountComponentAtNode;
// @ts-ignore
ReactDOMLegacy.unmountComponentAtNode = (container: Element) => {
  const root = rootMap.get(container);
  if (root) {
    root.unmount();
    rootMap.delete(container);
    return true;
  }
  // fallback
  return originalUnmount ? originalUnmount(container) : true;
};

// Automatically enable controls for props whose type is inferred as an object
const objectControlEnhancer = (context: any) => {
  const { argTypes = {} } = context;
  const enhanced: Record<string, any> = { ...argTypes };
  Object.entries(enhanced).forEach(([key, val]) => {
    const argType: any = val;
    // If no control defined and the inferred type is object, assign a generic object control
    if (!argType?.control && (argType?.type?.name === 'object' || argType?.type?.summary === 'object')) {
      enhanced[key] = { ...argType, control: { type: 'object' } };
    }
  });
  return enhanced;
};

const preview: Preview = {
  decorators: [
    (Story) => (
        <Story />
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

// Register the custom enhancer globally so it applies to all stories
export const argTypesEnhancers = [objectControlEnhancer];

export default preview; 