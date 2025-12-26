staqlt News Automation Engine

This repository contains the architecture for an elite, faceless political news automation pipeline.

System Architecture

Intake: Takes a raw text script.

Audio Layer: Uses ElevenLabs for authoritative, human-like narration.

Visual Strategy: GPT-4o analyzes the script to determine where to place 'Fair Use' news clips vs. AI-generated B-roll.

Assembly: Creatomate API handles the complex layering of motion graphics, captions, and overlays.

Distribution: The final render is pushed directly to YouTube via OAuth2 as a private draft.

Prerequisites

OpenAI API Key: For script analysis.

ElevenLabs API Key: For high-retention voice synthesis.

Creatomate API Key: For programmatic video editing.

YouTube Data API v3: For automatic draft uploads.

Running the Pipeline
Bash
npm install
node index.js