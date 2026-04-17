use serde::{Deserialize, Serialize};
use tauri::Manager;

// ── Data Types ──────────────────────────────────────────────────────────────

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct User {
    pub id: u64,
    pub username: String,
    pub email: String,
    pub phone: String,
    
    pub password: String,
    pub join_date: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct LevelProgress {
    pub level_id: u32,
    pub score: u32,
    pub completed: bool,
    pub attempts: u32,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct LanguageProgress {
    pub lang_id: String,
    pub current_level: u32,
    pub completed_levels: std::collections::HashMap<String, u32>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct AppState {
    pub user: Option<User>,
    pub progress: std::collections::HashMap<String, LanguageProgress>,
    pub xp: u32,
    pub streak: u32,
    pub last_login: String,
    pub dark_mode: bool,
}

// ── Commands ─────────────────────────────────────────────────────────────────

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! Welcome to ByteBunny 🐰", name)
}

#[tauri::command]
fn validate_password(password: String) -> u32 {
    let mut strength: u32 = 0;
    if password.len() >= 8 { strength += 1; }
    if password.chars().any(|c| c.is_uppercase()) { strength += 1; }
    if password.chars().any(|c| c.is_numeric()) { strength += 1; }
    if password.chars().any(|c| !c.is_alphanumeric()) { strength += 1; }
    strength
}

#[tauri::command]
fn calculate_level_score(hearts_remaining: u32, max_hearts: u32, attempts: u32) -> u32 {
    let base = (hearts_remaining as f32 / max_hearts as f32 * 100.0) as u32;
    let penalty = (attempts.saturating_sub(1)) * 10;
    base.saturating_sub(penalty).max(10)
}

#[tauri::command]
fn get_xp_for_level(level_id: u32, score: u32, base_xp: u32) -> u32 {
    let tier_bonus = (level_id / 10) * 5;
    ((base_xp + tier_bonus) as f32 * score as f32 / 100.0) as u32
}

#[tauri::command]
fn get_app_version() -> String {
    env!("CARGO_PKG_VERSION").to_string()
}

// ── App Setup ────────────────────────────────────────────────────────────────

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
//
        // Correct way to initialize plugins in Tauri v2
        .plugin(tauri_plugin_store::Builder::new().build()) 
//
        .plugin(tauri_plugin_store::Builder::default().build())
////
        .plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            validate_password,
            calculate_level_score,
            get_xp_for_level,
            get_app_version,
        ])
        .setup(|app| {
            #[cfg(debug_assertions)]
            {
//
                // In v2, use the get_webview_window helper
                if let Some(window) = app.get_webview_window("main") {
                    window.open_devtools();
                }
//
                let window = app.get_webview_window("main").unwrap();
                window.open_devtools();
////
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running ByteBunny");
}
