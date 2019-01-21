import React from "react";

/**
 * Komponenta zobrazuje hlavnu obrazovku webu
 */
class Welcome extends React.Component{
    render() {
        return (
            <div>
                <h1>Welcome {this.props.match.params.name}!</h1>
                <button className={"btn"} onClick={() => this.props.history.push(`/`)}>Go back</button>
            </div>
        );
    }
}

export default Welcome;