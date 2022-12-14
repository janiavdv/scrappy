import { title } from "process";
import { useEffect, useState } from "react";
import { getEntryOffID } from "../utils/dbutils";
import Entry from "./EntryObject";

export interface PageProps {
  id: string;
}

// The HTML for a Page.
export default function Page({ id }: PageProps) {
  let time = new Date();
  const [pageInfo, setInfo] = useState<Entry>();

  useEffect(() => {
    getEntryOffID(id).then((page) => setInfo(page));
  });

  if (pageInfo != null) {
    return (
      <div className="page">
        <hr className="page-divider-top"></hr>
        <div className="page-header">
          <div className="left-page-header">
            <code>Title: {title}</code>
            <h4>
              {time.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </h4>
            <p>{"#" + pageInfo.tag}</p>
          </div>

          <img
            src={pageInfo.imageLink}
            className="page-img"
            referrerPolicy="no-referrer"
          />
        </div>

        <code>Caption: {pageInfo.caption}</code>
        <hr className="page-divider-bottom"></hr>
      </div>
    );
  }
  return <p>Loading Page...</p>;
}
