<div align="center">
  <img alt="" src="" />
</div>

<br>
<br>

# 💫사람, 별

## 💬 프로젝트 소개

내 사람과의 약속을 쉽게 관리할 수 있는 서비스 **사람, 별**
<br><br>

> - **작업 기간** : 2025.03.28 ~ 2025.05.01
> - **배포 주소** : https://www.sarambyeol.com

<br />

## 👩‍👩‍👧‍👧 프로젝트 멤버 소개

<table>
  <tbody>
    <tr>
      <td align="center" width="300px">
        <a href="https://github.com/DnJ0408">
          <img src="https://avatars.githubusercontent.com/u/190340654?v=4" width="80" alt="오영진" />
          <br />
          <sub><b>깃허브</b></sub>
        </a>
        <br />
        팀장<br>내 사람, 다가오는 약속 리스트, 내 사람 리스트 CRD
      </td>
      <td align="center" width="300px">
        <a href="https://github.com/kjjyyy01">
          <img src="https://avatars.githubusercontent.com/u/169040000?v=4" width="80" alt="김종연" />
          <br />
          <sub><b>깃허브</b></sub>
        </a>
        <br />
        부팀장<br>로그인/회원가입 페이지, 소셜로그인, 로그인 정보 저장
      </td>
      <td align="center" width="300px">
        <a href="https://github.com/mangomaneya">
          <img src="https://avatars.githubusercontent.com/u/87506724?v=4" width="80" alt="이기리" />
          <br />
          <sub><b>깃허브</b></sub>
        </a>
        <br />
        팀원<br>랜딩페이지, 데모모드, 약속추가
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/JinchaeKim">
          <img src="https://avatars.githubusercontent.com/u/192092805?v=4" width="80" alt="김진채" />
          <br />
          <sub><b>깃허브</b></sub>
        </a>
        <br />
        팀원<br>캘린더 페이지
      </td>
      <td align="center">
        <a href="https://github.com/shoney02">
          <img src="https://avatars.githubusercontent.com/u/114558496?v=4" width="80" alt="김시헌" />
          <br />
          <sub><b>깃허브</b></sub>
        </a>
        <br />
        팀원<br>내사람 페이지
      </td>
      <td align="center">
        <a href="https://archlory.tistory.com">
          <img src="https://ca.slack-edge.com/T06B9PCLY1E-U07LU0Z5GHM-5e06801a8585-512" width="80" alt="김영광" />
          <br />
          <sub><b>블로그</b></sub>
        </a>
        <br />
        디자이너<br>웹/모바일 시안 작업, 프로젝트 커버 등 최종발표 준비
      </td>
    </tr>
  </tbody>
</table>

<br />

## ⚙ 프로젝트 기능 소개

- 랜딩 페이지
  - 서비스에 대한 소개
- 로그인/회원가입
  - 이메일, 구글, 카카오 로그인 지원
  - 로그인 정보 저장 기능
- 내 사람 페이지
  - 내 사람 등록 및 약속 CRUD(Create(생성), Read(조회), Update(수정), Delete(삭제))
- 캘린더 페이지
  - Drag & Drop으로 약속 일정 조정
  - 원하는 날짜에 빠른 약속 추가
  - 30일 이내의 다가오는 약속 확인
- 데모 체험 모드
  - 서비스 사용 전 체험해볼 수 있는 기능
  - CRUD기능 제한

<br>

## 🔗 협업 프로세스

- ### 기능 단위 작업 관리
  - 각 기능별 이슈 생성 https://github.com/DnJ0408/saram-byeol/issues
  - 기능별 feature 브랜치 운영 (`feat/#이슈번호-이슈명`, `style/#이슈번호-이슈명`)
- ### Pull Request 템플릿을 활용한 코드 리뷰
  - https://github.com/DnJ0408/saram-byeol/pulls

<br><br>

## 🚀 트러블 슈팅

- #### datePicker 날짜와 supabase 데이터 간의 차이 발생 이유 및 대처방안
  - https://mangoman-e-ya.tistory.com/116
- #### Next.js 에러 핸들링 (error.tsx)
  - https://coco910.tistory.com/129

<br />

## 📁 프로젝트 구조

```markdown
📁 public
📁 src
├─ app
│ ├─ (pages)
│ │ ├─ (nav) ← LNB 포함 페이지들
│ │ │ ├─ calendar
│ │ │ ├─ people
│ │ ├─ signIn
│ │ ├─ signUp
│ ├─ api
│ │ ├─ supabase ← Supabase client & service
│ │ ├─ holidays ← 공휴일 관련 API
│ │ └─ planForm ← 장소 검색 API
│ ├─ auth/callback
│ ├─ layout.tsx
│ ├─ providers.tsx
├─ components
├─ constants
├─ hooks
├─ lib
├─ store ← Zustand 등 상태 관리
├─ types
```

<br />

## 🧶 기술 스택

<div align="left">

### BaaS

<img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />

### Environment

<img src="https://img.shields.io/badge/Visual_Studio_Code-007ACC?style=for-the-badge&logo=https://upload.wikimedia.org/wikipedia/commons/a/a7/Visual_Studio_Code_1.35_icon.svg&logoColor=white" />
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" />
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
<img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white" />
<br>

### Development

<img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/Tanstackquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
<img src="https://img.shields.io/badge/Zustand-82612C?style=for-the-badge&logo=&logoColor=white">      
<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&amp;logo=Tailwind CSS&amp;logoColor=white">

### Design

<img src="https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white" />

</div>
