import React from "react";
import "survey-react/survey.css";
import * as Survey from "survey-react";
import axios from "../../axios.js";
import { Json } from "../surveys/questions_two.js";
import { sendSurveyUserAnswers } from "../../actions.js";

Survey.StylesManager.applyTheme("bootstrap");
Survey.defaultBootstrapCss.navigationButton = "btn btn-blue";

function sendDataToServer(survey, options) {
    console.log("Survey results: ", survey.data);
    //alert("The results are:" + JSON.stringify(survey.data));
    let answer = JSON.stringify(survey.data);
    sendSurveyUserAnswers(10, 2, answer);

    //options.showDataSaving();

    /*
    if (status == "success") {
        //Show that data was send successfully
        options.showDataSavingSuccess();
    } else {
        //Display retry button in case of error
        options.showDataSavingError();
    }
    */
}

let Json2 = {
    surveyId: "05c785ea-572c-451c-9434-2b5175f29dae",
    surveyPostId: "9b9e968d-500e-4b8c-a107-9ebbb61edc45",
};

const MySurvey = (prop) => {
    return (
        <Survey.Survey
            json={Json2}
            showCompletedPage={true}
            onComplete={sendDataToServer}
        />
    );
};
export default MySurvey;
