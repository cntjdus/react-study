# CECOM CAU Chatbot 🤖

> Week 5 AI API 실습  
> React + Vite 환경에서 Gemini API를 직접 호출해 간단한 챗봇을 구현합니다.

---

## ✨ Preview

- 사용자 메시지 입력
- Gemini API 호출
- AI 응답 출력
- 사용자 / AI 말풍선 UI
- 로딩 상태 표시
- Enter 키 전송
- 보내기 버튼 Hover 효과
- 입력창 Focus 효과

---

## 🛠 Tech Stack

<div>

<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/Gemini_API-8E75B2?style=flat-square&logo=google&logoColor=white" />

</div>

---

## 📁 Project Structure

```text
gemini-chatbot/
├─ public/
│
├─ src/
│  ├─ App.jsx
│  ├─ App.css
│  └─ main.jsx
│
├─ .env
├─ .gitignore
├─ index.html
├─ package.json
├─ package-lock.json
└─ vite.config.js
```

### 주요 파일

| 파일 | 역할 |
| --- | --- |
| `App.jsx` | 챗봇 UI, 상태 관리, Gemini API 호출 |
| `App.css` | 챗봇 UI 스타일 및 인터랙션 |
| `main.jsx` | React 앱 실행 |
| `.env` | Gemini API Key 저장 |
| `.gitignore` | Git에 업로드하지 않을 파일(.env) 설정 |

---

## 🔑 Gemini API Key 설정

Gemini API를 사용하기 위해 API Key가 필요합니다.

API Key를 발급받은 후 프로젝트 최상단에 `.env` 파일을 생성합니다.

```text
gemini-chatbot/
├─ src/
├─ .env
├─ package.json
└─ vite.config.js
```

`.env`

```env
VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

React 코드에서는 다음과 같이 사용할 수 있습니다.

```js
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
```

---

## 🔒 .env 파일 보호하기

`.env` 파일에는 API Key와 같은 민감한 정보가 포함되어 있기 때문에 GitHub에 업로드하면 안 됩니다.

`.gitignore` 파일에 아래 내용을 추가합니다.

```gitignore
.env
```

이미 `.env`를 Git에 추가했다면 다음 명령어로 Git 추적을 해제합니다.

```bash
git rm --cached .env
```

이후 다시 커밋합니다.

```bash
git add .
git commit -m "chore: remove env file from git tracking"
```

---

## 🤖 Gemini API 호출

이번 실습에서는 Gemini API를 HTTP 요청으로 직접 호출합니다.

```js
const model = "gemini-3.6-flash";

const url =
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`;
```

요청 예시는 다음과 같습니다.

```js
const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: userMessage,
          },
        ],
      },
    ],
  }),
});
```

응답은 JSON 형태로 전달됩니다.

```js
const data = await response.json();
```

AI가 생성한 텍스트는 다음과 같이 가져올 수 있습니다.

```js
const aiText =
  data?.candidates?.[0]?.content?.parts
    ?.map((part) => part.text)
    .filter(Boolean)
    .join("\n") ||
  "응답을 가져오지 못했습니다.";
```

---

## 🔄 AI API 동작 흐름

```text
사용자 입력
    ↓
React
    ↓
HTTP Request
    ↓
Gemini API
    ↓
AI Model
    ↓
JSON Response
    ↓
React
    ↓
AI 답변 출력
```

### 01. Request

사용자가 입력한 메시지를 API 서버로 전송합니다.

### 02. Processing

AI 서버에서 모델이 입력 내용을 분석하고 응답을 생성합니다.

### 03. Response

생성된 결과를 JSON 형태로 전달받습니다.

### 04. Post-Processing

받아온 데이터를 React 화면에 채팅 말풍선 형태로 출력합니다.

---

## 💬 Chatbot Features

메시지는 `useState`를 이용해 배열 형태로 관리합니다.

```js
const [messages, setMessages] = useState([
  {
    role: "assistant",
    text: "안녕하세요! 무엇이든 물어보세요 👋",
  },
]);
```

사용자 메시지는 다음과 같은 형태로 저장합니다.

```js
{
  role: "user",
  text: userMessage,
}
```

AI 메시지는 다음과 같은 형태로 저장합니다.

```js
{
  role: "assistant",
  text: aiText,
}
```

---

## ⌨️ Enter 키로 메시지 전송

```js
const handleKeyDown = (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
};
```

- `Enter` → 메시지 전송
- `Shift + Enter` → 줄바꿈

---

## ⏳ Loading UI

AI가 답변을 생성하는 동안 로딩 상태를 표시합니다.

```js
const [loading, setLoading] = useState(false);
```

```jsx
{loading && (
  <div className="message-row assistant-row">
    <div className="avatar">멋사AI</div>

    <div className="message assistant-message loading-message">
      <span />
      <span />
      <span />
    </div>
  </div>
)}
```

---

## 🎨 UI Interaction

### 입력창 Focus

입력창을 클릭하면 파란색 테두리로 변경됩니다.

```css
.chat-input-area textarea {
  border: 1px solid #dddde3;
  transition: border-color 0.2s ease;
}

.chat-input-area textarea:focus {
  border-color: #0048ff;
}
```

### 보내기 버튼 Hover

```css
.chat-input-area button {
  background: #0048ff;
  transition:
    background-color 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.2s ease;
}

.chat-input-area button:hover:not(:disabled) {
  background: #0048ff;
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(255, 119, 16, 0.22);
}
```

---

## 🚨 Error Handling

API 요청이 실패하면 에러 메시지를 사용자에게 보여줍니다.

```js
if (!response.ok) {
  throw new Error(
    data?.error?.message ||
      `Gemini API 요청에 실패했습니다. (${response.status})`
  );
}
```

```js
catch (error) {
  setMessages((prev) => [
    ...prev,
    {
      role: "assistant",
      text: `오류가 발생했습니다.\n${error.message}`,
    },
  ]);
}
```

---

## ⚠️ API Key 사용 시 주의사항

이번 프로젝트에서는 AI API의 동작 과정을 이해하기 위한 실습 목적으로 프론트엔드에서 API를 호출합니다.

하지만 실제 서비스에서는 프론트엔드 코드에 API Key를 직접 포함하면 브라우저에서 노출될 수 있습니다.

실제 서비스에서는 다음과 같은 구조를 권장합니다.

```text
Frontend
   ↓
Backend
   ↓
AI API
```

Backend에서는 다음 역할을 담당합니다.

- API Key 관리
- 사용자 인증
- 요청 검증
- AI API 호출
- 에러 처리
- 사용량 및 비용 관리

---

## 📌 실습 목표

이번 실습을 통해 다음 내용을 이해하는 것을 목표로 합니다.

- AI API의 기본 동작 구조 이해
- HTTP Request / Response 이해
- Gemini API 호출
- React에서 비동기 요청 처리
- API 응답을 UI에 렌더링
- Loading / Error 상태 처리
- 환경변수를 이용한 API Key 관리

---

## 📝 추가로 해볼 사항

### 1. 직접 호출 방식으로 리팩토링

AI SDK 또는 별도 패키지에 의존하지 않고 `fetch` 또는 `axios`를 이용해 AI API를 직접 호출해봅니다.

### 2. AI API 내용 정리

- 오늘 배운 내용 개념 정리
- 어떤 AI API를 사용해봤는지
- 어떤 기능에 사용했는지
- 어떤 방식으로 연결했는지
- 구현하면서 발생한 문제는 무엇이었는지

### 3. 챗봇의 UI/UX 개선

예시:

- 채팅 말풍선 디자인
- 다크모드
- 응답 복사
- 다시 생성
- Markdown 렌더링
- 자동 스크롤
- 대화 초기화
- 반응형 디자인

---

## CECOM CAU

**Week 5 — AI API**

> AI 모델을 직접 만드는 것뿐만 아니라,  
> 이미 만들어진 AI를 서비스에 어떻게 연결하고 활용하는지도 중요한 개발 경험입니다.