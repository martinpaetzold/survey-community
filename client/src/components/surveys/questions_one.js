export const Json = {
    title: "Survey First Try",
    description: "Awesome! This is the first survey with SurveyJS.",
    pages: [
        {
            name: "page1",
            elements: [
                {
                    type: "checkbox",
                    name: "question1",
                    isRequired: true,
                    title: "What kind of operating system do you use?",
                    choices: [
                        {
                            value: "item1",
                            text: "MacOS",
                        },
                        {
                            value: "item2",
                            text: "Windows",
                        },
                        {
                            value: "item3",
                            text: "Linux",
                        },
                    ],
                },
                {
                    type: "rating",
                    name: "question4",
                    isRequired: true,
                    title: "Please rate this social community",
                    rateMax: 10,
                },
            ],
        },
    ],
};
