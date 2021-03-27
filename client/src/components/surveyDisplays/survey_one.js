import React, { useState, useCallback } from "react";
import MySurvey from "../surveyTypes/type_one.js";

const SurveyOne = () => {
    const [showPage, setShowPage] = useState(true);
    const onCompletePage = useCallback(
        (data) => {
            console.log(data);
            setShowPage(!showPage);
        },
        [showPage]
    );
    const setFinalPage = () => {
        return (
            <main>
                <h1>Thank you to take your time for this survey!</h1>
            </main>
        );
    };

    return (
        <div id="surveyContainer">
            {showPage ? (
                <MySurvey showCompletedPage={(data) => onCompletePage(data)} />
            ) : (
                setFinalPage()
            )}
        </div>
    );
};
export default SurveyOne;
