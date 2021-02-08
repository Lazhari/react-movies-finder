import { render, screen } from "@testing-library/react";
import ActorCard from "../../components/ActorCard";

test("renders the ActorCard", () => {
  render(
    <ActorCard
      actor={{
        id: 1,
        name: "James Bond",
        profile_path: "profile.png",
      }}
    />
  );
  const linkElement = screen.getByText(/James/i);
  expect(linkElement).toHaveTextContent("James Bond");
});
