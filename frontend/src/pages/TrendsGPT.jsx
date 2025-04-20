import ChatWindow from "../components/ChatWindow";

function TrendsGPT() {
    return (
        <div className="min-h-full flex-col justify-items-center justify-content-center">
            <div className="h-1/8 top-0 max-w-full grow flex flex-col text-center">
                <h2 className="text-sm font-semibold mb-1 text-cornflower-600 dark:text-cornflower-400 tracking-wider">
                    POWERED BY {/*eslint-disable-next-line react/jsx-no-target-blank*/}
                    <a
                        href="https://www.utdnebula.com/"
                        target="_blank"
                        rel="noopener"
                        className="underline decoration-transparent hover:decoration-inherit transition"
                    >
                        NEBULA LABS
                    </a>
                </h2>
                <h1 className="text-3xl font-extrabold font-kallisto">
                    TrendsGPT
                </h1>
            </div>

                <ChatWindow />
            </div>

  );
}

export default TrendsGPT;
