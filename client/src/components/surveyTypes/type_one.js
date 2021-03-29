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

const MySurvey = (prop) => {
    return (
        <Survey.Survey
            json={Json}
            showCompletedPage={true}
            onComplete={sendDataToServer}
        />
    );
};
export default MySurvey;
