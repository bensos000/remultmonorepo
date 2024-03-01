import { Allow, Entity, Fields, Validators } from "remult"

@Entity("tasks", {
  allowApiCrud: false,
  allowApiRead: Allow.authenticated
})
export class Task {
  @Fields.cuid()
  id = ""

  @Fields.string({
    validate: Validators.required()
  })
  title = ""

  @Fields.boolean()
  completed = false

  @Fields.createdAt()
  createdAt?: Date
}