const result = document.getElementById("result");
const history = document.getElementById("history");
const buttons = document.querySelectorAll("button");
const sound = document.getElementById("clickSound");

let expression = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {

        try {
            sound.currentTime = 0;
            sound.play();
        } catch {}

        const value = button.dataset.value;

        if (value === "AC") {
            expression = "";
            result.value = "0";
            history.textContent = "";
            return;
        }

        if (value === "DEL") {
            expression = expression.slice(0, -1);
            result.value = expression || "0";
            return;
        }

        if (value === "=") {
            if (expression === "") return;

            try {
                history.textContent = expression;

                expression = eval(expression).toString();

                result.value = expression;
            } catch {
                result.value = "Error";
                expression = "";
            }
            return;
        }

        expression += value;
        result.value = expression;
    });
});

document.addEventListener("keydown", e => {
    const key = e.key;

    if (
        "0123456789+-*/.%".includes(key)
    ) {
        expression += key;
        result.value = expression;
    }

    if (key === "Enter") {
        try {
            history.textContent = expression;
            expression = eval(expression).toString();
            result.value = expression;
        } catch {
            result.value = "Error";
            expression = "";
        }
    }

    if (key === "Backspace") {
        expression = expression.slice(0, -1);
        result.value = expression || "0";
    }

    if (key === "Escape") {
        expression = "";
        history.textContent = "";
        result.value = "0";
    }
});