# serp-dist-client

유통 ERP 배분/보충

# Main ERP Client

- NextJS
- Parte Design System

More tech stack information(https://www.notion.so/ERP-20271815262b476aaf34c08cd1944870)

## 프로젝트 시작하기

### 리모트 레포지토리 상태를 나의 로컬로 받아오기

```
git clone https://github.com/fnf-es/serp-dist-client.git
git remote rename origin upstream
git fetch upstream
git rebase upstream/develop
git checkout upstream/develop
git switch -c new_branch_name
```

### pnpm을 설치한다.

아래 명령 중 하나를 실행한다.

```
npm install -g pnpm
```

```
brew install pnpm
```

그리고 패키지를 설치 한 뒤

```
  pnpm install
```

프로젝트를 실행한다.

```
  pnpm run dev
```
