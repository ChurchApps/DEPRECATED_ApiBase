import { AnswerRepository, FormRepository, FormSubmissionRepository, NoteRepository, QuestionRepository } from ".";

export class Repositories {
  public answer: AnswerRepository;
  public form: FormRepository;
  public formSubmission: FormSubmissionRepository;
  public note: NoteRepository;
  public question: QuestionRepository;


  constructor() {
    this.answer = new AnswerRepository();
    this.form = new FormRepository();
    this.formSubmission = new FormSubmissionRepository();
    this.note = new NoteRepository();
    this.question = new QuestionRepository();
  }
}
