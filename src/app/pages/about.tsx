import * as React from "react";

export default function AboutPage({
  serverSideProps,
}: {
  serverSideProps: any;
}) {
  const [clicks, setClicks] = React.useState(0);

  return (
    <div className="flex flex-col gap-4 justify-center items-center mt-8">
      <h1 className="font-bold text-4xl">About</h1>

      <pre className="p-2 border rounded-md w-[400px]">
        {JSON.stringify(serverSideProps, null, 2)}
      </pre>

      <a className="text-blue-400 underline" href="/">
        Go back
      </a>
    </div>
  );
}
