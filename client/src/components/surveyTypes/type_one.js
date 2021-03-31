import React from "react";
import "survey-react/survey.css";
import * as Survey from "survey-react";
import axios from "../../axios.js";
import { Json } from "../surveys/questions_one.js";
import { sendSurveyUserAnswers } from "../../actions.js";

Survey.StylesManager.applyTheme("modern");

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
    surveyId: "8450345c-1912-4e30-b293-7ef23f933287",
    surveyPostId: "cf075257-923f-4458-9eb6-1e6a2d4e4484",
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
