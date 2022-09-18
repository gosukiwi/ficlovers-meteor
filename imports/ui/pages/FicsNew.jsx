import { Meteor } from "meteor/meteor";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function FicsNew() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = ({ title, description }) => {
    Meteor.call("fics.insert", title, description);

    reset();
  };

  return (
    <>
      <Link to="/fics">Back</Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Write New Fic</h2>
        <div>
          <input placeholder="title" {...register("title")} />
        </div>
        <div>
          <textarea placeholder="description" {...register("description")} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
