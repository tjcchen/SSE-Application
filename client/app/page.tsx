"use client";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState("");

  const sendMsg = () => {
    const pushData = new EventSource("http://localhost:8000/sse/data/");
    pushData.onopen = (event) => {
      // open connection
      console.log("EventSource Connection Succeed");
    };

    pushData.onmessage = (event) => {
      try {
        setData((prev) => prev + " " + event.data);
        console.log(event);
      } catch (error) {
        console.log("EventSource Error", error);
      }
    };

    pushData.onerror = (error) => {
      console.log("EventSource Error", error);
    };
  };

  return (
    <main className={styles.layout}>
      <h3>SSE Application</h3>
      <button className="btn btn-primary mt-2" onClick={sendMsg}>
        Retrieve Server Data
      </button>
      <div
        className="row mt-3"
        style={{
          border: "1px solid rgba(0,0,0,0.1)",
          padding: "6px",
          borderRadius: "6px",
        }}
      >
        <span>Server Response: </span>
        <div className={styles.sseContainer} dangerouslySetInnerHTML={{__html: data}}></div>
      </div>
    </main>
  );
}
