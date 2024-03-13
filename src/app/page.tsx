"use client";
import initialzeDataInDatabase from "@/utils/initialize-db";
export default async function Home() {
  return (
    <>
      <div className="flex flex-col">
        <button
          className="w-screen my-4"
          onClick={() => initialzeDataInDatabase()}
        >
          inittailie db with some data
        </button>
      </div>
    </>
  );
}
