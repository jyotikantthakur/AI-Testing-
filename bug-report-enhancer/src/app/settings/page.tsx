"use client";

import { useState, useEffect, type FormEvent } from "react";
import { getSettings, saveSettings, type AppSettings } from "@/lib/storage";

type TestStatus = "idle" | "loading" | "success" | "error";

export default function SettingsPage() {
    const [settings, setSettings] = useState<AppSettings>({
        jiraProject: "",
        jiraEmail: "",
        jiraApiKey: "",
        jiraUrl: "",
        jiraIssueType: "Bug",
        groqApiKey: "",
    });

    const [saved, setSaved] = useState(false);
    const [jiraTestStatus, setJiraTestStatus] = useState<TestStatus>("idle");
    const [jiraTestMsg, setJiraTestMsg] = useState("");
    const [groqTestStatus, setGroqTestStatus] = useState<TestStatus>("idle");
    const [groqTestMsg, setGroqTestMsg] = useState("");

    useEffect(() => {
        setSettings(getSettings());
    }, []);

    const updateField = (field: keyof AppSettings, value: string) => {
        setSettings((prev) => ({ ...prev, [field]: value }));
        setSaved(false);
    };

    const handleSave = (e: FormEvent) => {
        e.preventDefault();
        saveSettings(settings);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const testJira = async () => {
        setJiraTestStatus("loading");
        setJiraTestMsg("");
        try {
            const res = await fetch("/api/settings/test-jira", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    jiraUrl: settings.jiraUrl,
                    jiraEmail: settings.jiraEmail,
                    jiraApiKey: settings.jiraApiKey,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Connection failed");
            setJiraTestStatus("success");
            setJiraTestMsg(`✅ Connected as ${data.displayName}`);
        } catch (err: unknown) {
            setJiraTestStatus("error");
            setJiraTestMsg(`❌ ${err instanceof Error ? err.message : "Connection failed"}`);
        }
    };

    const testGroq = async () => {
        setGroqTestStatus("loading");
        setGroqTestMsg("");
        try {
            const res = await fetch("/api/settings/test-groq", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ groqApiKey: settings.groqApiKey }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Connection failed");
            setGroqTestStatus("success");
            setGroqTestMsg(`✅ GROQ API key valid — ${data.modelsCount} models available`);
        } catch (err: unknown) {
            setGroqTestStatus("error");
            setGroqTestMsg(`❌ ${err instanceof Error ? err.message : "Connection failed"}`);
        }
    };

    return (
        <div className="page-container">
            <h1 className="page-title">Settings</h1>

            <form className="settings-form" onSubmit={handleSave}>
                {/* JIRA Section */}
                <fieldset className="settings-section">
                    <legend className="section-legend">
                        <span className="legend-number">1</span>
                        JIRA Connection Details
                    </legend>

                    <div className="field-group">
                        <label htmlFor="jira-project">Project Key</label>
                        <input
                            id="jira-project"
                            type="text"
                            placeholder="e.g. KAN (short uppercase code, not project name)"
                            value={settings.jiraProject}
                            onChange={(e) => updateField("jiraProject", e.target.value.toUpperCase())}
                        />
                        <span className="field-hint">The short key from your JIRA project URL (e.g. KAN, VWO, BT)</span>
                    </div>

                    <div className="field-group">
                        <label htmlFor="jira-email">Email Address</label>
                        <input
                            id="jira-email"
                            type="email"
                            placeholder="your-email@company.com"
                            value={settings.jiraEmail}
                            onChange={(e) => updateField("jiraEmail", e.target.value)}
                        />
                    </div>

                    <div className="field-group">
                        <label htmlFor="jira-api-key">API Key (Token)</label>
                        <input
                            id="jira-api-key"
                            type="password"
                            placeholder="Your JIRA API token"
                            value={settings.jiraApiKey}
                            onChange={(e) => updateField("jiraApiKey", e.target.value)}
                        />
                    </div>

                    <div className="field-group">
                        <label htmlFor="jira-url">JIRA URL</label>
                        <input
                            id="jira-url"
                            type="url"
                            placeholder="https://yourorg.atlassian.net"
                            value={settings.jiraUrl}
                            onChange={(e) => updateField("jiraUrl", e.target.value)}
                        />
                    </div>

                    <div className="field-group">
                        <label htmlFor="jira-issue-type">Issue Type</label>
                        <input
                            id="jira-issue-type"
                            type="text"
                            placeholder="Bug"
                            value={settings.jiraIssueType}
                            onChange={(e) => updateField("jiraIssueType", e.target.value)}
                        />
                    </div>

                    <button
                        type="button"
                        className={`test-btn ${jiraTestStatus}`}
                        onClick={testJira}
                        disabled={jiraTestStatus === "loading" || !settings.jiraUrl || !settings.jiraEmail || !settings.jiraApiKey}
                        id="test-jira-btn"
                    >
                        {jiraTestStatus === "loading" ? (
                            <span className="btn-loading"><span className="spinner" /> Testing…</span>
                        ) : (
                            "Test JIRA Connection"
                        )}
                    </button>
                    {jiraTestMsg && (
                        <p className={`test-result ${jiraTestStatus}`} id="jira-test-result">{jiraTestMsg}</p>
                    )}
                </fieldset>

                {/* GROQ Section */}
                <fieldset className="settings-section">
                    <legend className="section-legend">
                        <span className="legend-number">2</span>
                        GROQ API Key
                    </legend>

                    <div className="field-group">
                        <label htmlFor="groq-api-key">API Key</label>
                        <input
                            id="groq-api-key"
                            type="password"
                            placeholder="gsk_..."
                            value={settings.groqApiKey}
                            onChange={(e) => updateField("groqApiKey", e.target.value)}
                        />
                    </div>

                    <button
                        type="button"
                        className={`test-btn ${groqTestStatus}`}
                        onClick={testGroq}
                        disabled={groqTestStatus === "loading" || !settings.groqApiKey}
                        id="test-groq-btn"
                    >
                        {groqTestStatus === "loading" ? (
                            <span className="btn-loading"><span className="spinner" /> Testing…</span>
                        ) : (
                            "Test GROQ Connection"
                        )}
                    </button>
                    {groqTestMsg && (
                        <p className={`test-result ${groqTestStatus}`} id="groq-test-result">{groqTestMsg}</p>
                    )}
                </fieldset>

                {/* Save */}
                <div className="save-row">
                    <button type="submit" className="save-btn" id="save-settings-btn">
                        Save Settings
                    </button>
                    {saved && <span className="save-indicator">✅ Settings saved</span>}
                </div>
            </form>
        </div>
    );
}
