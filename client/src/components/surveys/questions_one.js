{
    pages: [
        {
            name: "page1",
            elements: [
                {
                    type: "radiogroup",
                    name: "question2",
                    title: "Do you often yawn?",
                    choices: [
                        {
                            value: "item1",
                            text: "Yes",
                        },
                        {
                            value: "item2",
                            text: "No",
                        },
                        {
                            value: "item3",
                            text: "Maybe",
                        },
                    ],
                },
                {
                    type: "signaturepad",
                    name: "question6",
                    title: "Draw a nice picture",
                },
                {
                    type: "radiogroup",
                    name: "question3",
                    title:
                        "Summer holidays at last! Where would you like to go?",
                    choices: [
                        {
                            value: "item1",
                            text: "To the beach",
                        },
                        {
                            value: "item2",
                            text: "Cure",
                        },
                        {
                            value: "item3",
                            text: "Rehab",
                        },
                    ],
                    hasOther: true,
                    otherText: "Somewhere",
                },
                {
                    type: "radiogroup",
                    name: "question4",
                    title:
                        "You found a broken rotten egg in your room. What will you do?",
                    choices: [
                        {
                            value: "item1",
                            text: "Open a window right away",
                        },
                        {
                            value: "item2",
                            text: "Take a sniff first",
                        },
                    ],
                },
                {
                    type: "ranking",
                    name: "question9",
                    title: "Best Tarantino movie ever?",
                    choices: [
                        {
                            value: "item1",
                            text: "Kill Bill",
                        },
                        {
                            value: "item2",
                            text: "Death Proof",
                        },
                        {
                            value: "item3",
                            text: "Pulp Fiction",
                        },
                    ],
                },
                {
                    type: "radiogroup",
                    name: "question8",
                    title: "What do you see in the picture below?",
                    choices: [
                        {
                            value: "item1",
                            text: "Nice grey circles",
                        },
                        {
                            value: "item2",
                            text: "A snake",
                        },
                        {
                            value: "item3",
                            text: "A pig",
                        },
                    ],
                },
                {
                    type: "image",
                    name: "question7",
                    imageLink:
                        "https://api.surveyjs.io/private/Surveys/files?name=d68582cb-d86a-4233-8975-98b0eb11cc56",
                },
                {
                    type: "radiogroup",
                    name: "question11",
                    title: "What is the answer for all?",
                    choices: [
                        {
                            value: "item1",
                            text: "WD-40",
                        },
                        {
                            value: "item2",
                            text: "Number 42",
                        },
                        {
                            value: "item3",
                            text: "Duct tape",
                        },
                    ],
                },
                {
                    type: "radiogroup",
                    name: "question5",
                    title:
                        "You noticed a wallet on the sidewalk. What do you do?",
                    choices: [
                        {
                            value: "item1",
                            text: "Turn it asap to the police.",
                        },
                        {
                            value: "item2",
                            text: "Yay! Yay!",
                        },
                        {
                            value: "item3",
                            text: "Is anyone watching?",
                        },
                    ],
                },
                {
                    type: "radiogroup",
                    name: "question1",
                    title: "Do you fall asleep without noticing?",
                    choices: [
                        {
                            value: "item1",
                            text: "Yes",
                        },
                        {
                            value: "item2",
                            text: "No",
                        },
                    ],
                },
                {
                    type: "rating",
                    name: "question10",
                    title:
                        "How much is the fish? On a scale from 1 (cheap) to 10 (expensive).",
                    rateMax: 10,
                },
            ],
            title: "What kind of personality do you have?",
        },
    ];
}
