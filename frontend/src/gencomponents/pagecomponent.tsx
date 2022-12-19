import { useEffect, useState } from "react";
import { getEntryOffID } from "../utils/dbutils";
import Entry from "../interfaces/EntryObject";

export interface PageProps {
  id: string;
}

// The HTML for a Page.
export default function Page({ id }: PageProps) {
  let time = new Date();
  const [pageInfo, setInfo] = useState<Entry>();

  useEffect(() => {
    getEntryOffID(id).then((page) => setInfo(page));
  }, []);

  if (pageInfo != null) {
    const TEXT_page = `This is a page in your book. Its title is ${pageInfo.title}
    and it is page number ${pageInfo.tag}. It contains an image and a caption 
    reading ${pageInfo.caption}.`;

    return (
      <div className="page" aria-label={TEXT_page}>
        <hr className="page-divider-top"></hr>
        <div className="page-header">
          <div className="left-page-header">
            <div>
              {pageInfo.publicized ? null : (
                <div className="publicity-info">
                  <p>[Private]</p>
                </div>
              )}
            </div>
            <code>Title: {pageInfo.title}</code>
            <h4>{pageInfo.time}</h4>
            <p>{"#" + pageInfo.tag}</p>
            <code>{pageInfo.caption}</code>
          </div>

          <img
            src={pageInfo.imageLink}
            className="page-img"
            referrerPolicy="no-referrer"
          />
        </div>

        <hr className="page-divider-bottom"></hr>
      </div>
    );
  }
  return <p>Loading Page...</p>;
}
