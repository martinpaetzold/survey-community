import React from "react";
import "survey-react/survey.css";
import * as Survey from "survey-react";
import axios from "../../axios.js";
import { Json } from "../surveys/questions_one.js";
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
    surveyId: "58936a84-2982-400b-bb1f-6812601a8b2e",
    surveyPostId: "21ce12e2-5dad-457d-ace4-c759f81e42bc",
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
