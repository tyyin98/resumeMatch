import React from "react";

export default function page() {
  return (
    <div className="w-1/2">
      <div>July 21</div>
      <div>
        <strong>Topic:</strong> <span>Next.js Caching mechanism</span>
      </div>
      <div>
        <strong>Problem description</strong>
        <div>
          After user uses 1 credit, the app sends request from its route handler
          to the database to update the number of credits, and revalidatePath()
          the path that displays the data. However, when the user then visits
          the page to see their credits left,{" "}
          <strong>they get old data, instead of the fresh data.</strong>
        </div>
      </div>
      <div>
        <strong>Workaround</strong>
      </div>
      <div>
        1. The data fetching process was on the server. Moved it to the client
        side, and then the user can get the latest data every time.
      </div>
      <div>
        2. The user used a link to navigate to the page displaying data. The
        link was implemented by &lt;Link&gt; tag. Changed it to &lt;a&gt; and it
        worked.
      </div>
      <div>
        <strong>Other methods attempted</strong>
      </div>
      <div>
        Besides the revalidatePath() function, I tried:
        <div>// export const fetchCache = "force-no-store";</div>{" "}
        <div>// export const revalidate = 0;</div>{" "}
        <div>// export const dynamic = "force-dynamic";</div>
        <div>while none of them worked.</div>
      </div>
      <div>
        <strong>Conclusion</strong>{" "}
      </div>

      <div>
        It seems I cannot stop next.js from using the cached data even with the
        several ways recommended in their official documenttaion.
      </div>
    </div>
  );
}
