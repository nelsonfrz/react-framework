import * as React from "react";

export async function getServerSideProps() {
  let secret = 123123;
  console.log(secret);

  return {
    data: "123",
    id: 12314,
  };
}

export default function HomePage({
  serverSideProps,
}: {
  serverSideProps: any;
}) {
  const [clicks, setClicks] = React.useState(0);

  return (
    <div className="flex flex-col gap-4 justify-center items-center mt-8">
      <h1 className="font-bold text-4xl">Hello world!</h1>

      <pre className="p-2 border rounded-md w-[400px]">
        {JSON.stringify(serverSideProps, null, 2)}
      </pre>

      <button
        className="w-[150px] rounded-md border p-2 hover:bg-slate-200 bg-slate-100"
        onClick={() => {
          setClicks((clicks) => clicks + 1);
          console.log({ serverSideProps });
        }}
      >
        Counter: {clicks}
      </button>
      <a className="text-blue-400 underline" href="/about">
        About
      </a>
    </div>
  );
}
