import { autocomplete } from "@algolia/autocomplete-js";
import React, { createElement, Fragment, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

export function Autocomplete(props: any) {
  const containerRef = useRef(null);
  const panelRootRef = useRef<HTMLElement | null>(null);
  //define a rootRef with useRef type as html element
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      renderer: { createElement, Fragment, render: () => {} },
      render({ children }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;
          //@ts-ignore
          panelRootRef.current?.unmount();
          //@ts-ignore
          panelRootRef.current = createRoot(root);
        }
        //@ts-ignore
        panelRootRef.current.render(children);
      },
      ...props,
    });

    return () => {
      search.destroy();
    };
  }, [props]);

  return <div ref={containerRef} />;
}
