// challenge
const message = "your phone number is contained somewhere in the digits of Pi";
const surprisedReaction = () => console.log("😲");
const smoothReaction = () => console.log("😎");
const saySomethingAndReact = (msg = "you forgot to submit a message") => {
    console.log(msg);
    return (reaction) => {
        reaction();
    };
};

// add the inputs here
saySomethingAndReact(message)(smoothReaction);
