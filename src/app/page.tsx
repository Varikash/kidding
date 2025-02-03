"use client"
import Image from "next/image";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
    const [inputValue, setInputValue] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [showError, setShowError] = useState(false);

    // Регулярное выражение для проверки ссылки на Jira тикет
    const jiraTicketPattern =
        /^https:\/\/extole\.atlassian\.net\/browse\/[A-Z]+-\d+$/;

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        // Проверка соответствия паттерну
        const valid = jiraTicketPattern.test(value);
        setIsValid(valid);

        // Показывать сообщение только если есть текст и он невалидный
        if (value && !valid) {
            setShowError(true);
        } else {
            setShowError(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            alert("Лох педальный, иди сам работай!");
            setInputValue("");
        }
    };

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.photoContainer}>
                    <Image
                        src="/IMG_6405.JPG"
                        alt="avatar"
                        width={250}
                        height={250}
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <fieldset className={styles.fieldSet}>
                        <legend>
                            Want to get rid of the annoying ticket? <br />
                            Pay 100 lei in cash and send a link.
                        </legend>
                        <input
                            type="text"
                            className={`${styles.input} ${
                                inputValue && !isValid ? styles.invalid : ""
                            }`}
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Enter Jira ticket link"
                        />
                        {showError && (
                            <p className={styles.error}>
                                Please enter a valid Jira ticket link!
                            </p>
                        )}
                        <button type="submit" disabled={!isValid}>
                            Send!
                        </button>
                    </fieldset>
                </form>
            </main>
            <footer className={styles.footer}></footer>
        </div>
    );
}