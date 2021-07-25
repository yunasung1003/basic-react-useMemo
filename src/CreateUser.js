import React from "react";

//4개의 props
// onChange: input 값이 변경했을 때 호출할 이벤트 처리 함수,  onCreate:  클릭했을시, 새로운 항목을 등록해주는 함수
function CreatUser({ username, email, onChange, onCreate }) {
  return (
    <div>
      <input
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      {/* 클릭시 onClick 의 함수인 onCreate 가 호출 */}
      <button onClick={onCreate}>등록</button>
    </div>
  );
}
export default CreatUser;
