import React, { useState } from "react";

const Forgot = () => {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleResetPassword = async () => {
        setErrorMessage("");
        setSuccessMessage("");

        if (!email) {
            setErrorMessage("Please enter your email address");
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage("Please enter a valid email address");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8081/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(
                    text.includes("<!DOCTYPE html>")
                        ? "Server error: received unexpected HTML response"
                        : "Failed to send reset email. Please try again later"
                );
            }

            const data = await response.json();
            setSuccessMessage("Password reset email sent successfully!");
            setEmail("");
        } catch (error) {
            setErrorMessage(error.message);
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.lockIcon}>
                    <i className="fas fa-lock" style={styles.lockIconInner}></i>
                </div>
                <h2 style={styles.heading}>Forgot Password?</h2>
                <p style={styles.text}>Enter your email address to reset your password</p>
                <div style={styles.inputGroup}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        style={styles.input}
                    />
                    {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
                    {successMessage && <div style={styles.successMessage}>{successMessage}</div>}
                </div>
                <button
                    onClick={handleResetPassword}
                    style={styles.button}
                    disabled={isLoading}
                >
                    {isLoading ? "Sending..." : "Reset Password"}
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f2f5",
    },
    card: {
        background: "white",
        padding: "2rem",
        borderRadius: "1rem",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        width: "90%",
        maxWidth: "400px",
        textAlign: "center",
    },
    lockIcon: {
        background: "#e3f2fd",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 1rem",
    },
    lockIconInner: {
        fontSize: "1.5rem",
        color: "#1976d2",
    },
    heading: {
        color: "#1d1d1d",
        marginBottom: "0.5rem",
    },
    text: {
        color: "#666",
        marginBottom: "1.5rem",
    },
    inputGroup: {
        marginBottom: "1rem",
    },
    input: {
        width: "100%",
        padding: "0.75rem",
        border: "1px solid #ddd",
        borderRadius: "0.5rem",
        outline: "none",
        transition: "border-color 0.2s",
        fontSize: "1rem",
    },
    button: {
        width: "100%",
        padding: "0.75rem",
        background: "#1976d2",
        color: "white",
        border: "none",
        borderRadius: "0.5rem",
        cursor: "pointer",
        fontWeight: "500",
        transition: "background-color 0.2s",
        fontSize: "1rem",
    },
    buttonHover: {
        background: "#1565c0",
    },
    errorMessage: {
        color: "#d32f2f",
        marginTop: "0.5rem",
        fontSize: "0.875rem",
    },
    successMessage: {
        color: "#2e7d32",
        marginTop: "0.5rem",
        fontSize: "0.875rem",
    },
};

export default Forgot;
