import React from "react";
import "survey-react/survey.css";
import * as Survey from "survey-react";
import { Json } from "../surveys/questions_one.js";

Survey.StylesManager.applyTheme("modern");

function sendDataToServer(survey) {
    //send Ajax request to your web server.
    alert("The results are:" + JSON.stringify(survey.data));
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
