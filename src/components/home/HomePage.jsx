import React from 'react';
import LastTestAttemptsList from "../test-stat/LastTestAttemptsList";

function HomePage(){

    return <div>
        <LastTestAttemptsList pageSize={5} isMinimized={true}/>
    </div>
}

export default HomePage;