"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function SearchBar() {
  const router = useRouter();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("q") as HTMLInputElement;
    const q = input.value.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/");
  }

  return (
    <form onSubmit={onSubmit} className="search">
      <input name="q" placeholder="Search make, model, year…" />
      <button type="submit">Search</button>
    </form>
  );
}
