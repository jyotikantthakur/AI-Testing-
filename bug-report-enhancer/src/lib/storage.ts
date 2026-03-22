export interface AppSettings {
    // JIRA
    jiraProject: string;
    jiraEmail: string;
    jiraApiKey: string;
    jiraUrl: string;
    jiraIssueType: string;
    // GROQ
    groqApiKey: string;
}

const STORAGE_KEY = "bug-report-enhancer-settings";

const defaultSettings: AppSettings = {
    jiraProject: "",
    jiraEmail: "",
    jiraApiKey: "",
    jiraUrl: "",
    jiraIssueType: "Bug",
    groqApiKey: "",
};

export function getSettings(): AppSettings {
    if (typeof window === "undefined") return defaultSettings;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return defaultSettings;
        return { ...defaultSettings, ...JSON.parse(raw) };
    } catch {
        return defaultSettings;
    }
}

export function saveSettings(settings: AppSettings): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}
