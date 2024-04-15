// Build an app that has one input component that autocompletes a list of ailments and displays the cost of the ailment in a table below the input. The table should have columns for ailment name, cost, and a button to remove the ailment from the list. The cost of the ailment should be fetched from the API at https://api.nhs.uk/conditions/ailments/{ailment-name}.
"use client";
import React from "react";
import { createElement, Fragment, useEffect, useRef } from "react";
import { autocomplete } from "@algolia/autocomplete-js";
import "@algolia/autocomplete-theme-classic";
import { Autocomplete } from "./(components)/Autocomplete";

const items = [{ value: "Catract" }, { value: "Fever" }];

export default function Page() {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <Autocomplete
        openOnFocus={true}
        getSources={({ query }: any) => [
          {
            sourceId: "items",
            getItems() {
              return items.filter((item) =>
                item.value.toLowerCase().includes(query.toLowerCase())
              );
            },
            templates: {
              item({ item }: any) {
                return <p>{item.value}</p>;
              },
            },
          },
        ]}
      />
    </div>
  );
}

// export default autocomplete;
