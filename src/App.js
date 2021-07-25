import "./styles.css";
import UserList from "./UserList";
import React, { useRef, useState, useMemo } from "react";
import CreateUser from "./CreateUser";

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는 중...");
  return users.filter((user) => user.active).length;
}
export default function App() {
  // 여러개의 input 관리 하기 위해 useState 여러번 쓰는 것이 아니라, 객체형체로 관리
  const [inputs, setInputs] = useState({
    username: "",
    email: ""
  });

  //미리 inputs, setInputs 추출
  const { username, email } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      //객체에서 스프레드 연산자를 사용해서 기존 값을 넣음
      ...inputs,
      // 받아온 name 값을 value로 덮어쓰우기, 밑에서 name 은 배열의 usename 이나 email 임
      [name]: value
    });
  };
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "make",
      email: "make111@gmail.com",
      active: true
    },
    {
      id: 2,
      username: "jane",
      email: "jane6988@gmail.com",
      active: false
    },
    {
      id: 3,
      username: "john",
      email: "john244@gmail.com",
      active: true
    }
  ]);
  //새로운 값을 추가하고싶을 때나 push, splice, sort 사용X
  //새로운 항목을 추가하는 방법(1~2)

  //useRef 가 변경된다고 리랜더링 X
  const nextId = useRef(4);

  const onCreate = () => {
    //1. 배열에서도 스프레드 연산자 사용가능
    //기존 배열을 복사하여, ...users 넣은다음 새로운 배열 [...users, user] 만들고 뒤에 user 넣어주면 항목 추가
    const user = {
      id: nextId.current,
      username,
      email
    };

    // 2. 새로운 배열을 만들어서 맨 마지막에 붙여줌
    // setUsers([...users, user]); 이것이 아니라 밑에 부분
    setUsers(users.concat(user));

    //클릭시 삭제하는 방법
    setInputs({
      username: "",
      email: ""
    });

    console.log(nextId.current); //4
    nextId.current += 1;
  };

  const onRemove = (id) => {
    // 각 user 객체 확인, user.id !==id (user.id 가 파라미터로 가져온 id 가 일치X) 만 축출
    //조건이 참일 시는 새로운 배열에 넣고 아닐시 배열 넣지 않음
    setUsers(users.filter((user) => user.id !== id));
  };

  //배열의 특정한 값만 업데이트 할때에도 map 사용, 일치할 시만 업데이트 가능
  //배열 안의 원소를 업데이트 할 땐, map 함수사용
  const onToggle = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? // user 객체 업데이트 할때, ...user 의 불변성 지켜줘야하기 때문
            // onToggle 호출 할때마다 !user.active 값이 반전
            { ...user, active: !user.active }
          : //값이 일치 하지 않을 땐 user 값 그대로 사용
            user
      )
    );
  };

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <div className="App">
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성 사용자 수: {count} </div>
    </div>
  );
}
