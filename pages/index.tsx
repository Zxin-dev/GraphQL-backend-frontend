import { gql, useQuery, useMutation } from "@apollo/client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const CREATE_POST = gql`
  mutation createPost($createInput: PostCreateInput!) {
    createPost(createInput: $createInput)
  }
`;
export default function Home() {
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST);
  console.log({ data, loading, error });
  return (
    <div>
      <button
        onClick={() => createPost({ variables: { input: { text: "hello" } } })}
      >
        post
      </button>
    </div>
  );
}
