import { AnswerRepository, FormRepository, FormSubmissionRepository, NoteRepository, QuestionRepository } from ".";

export class Repositories {
  public answer: AnswerRepository;
  public form: FormRepository;
  public formSubmission: FormSubmissionRepository;
  public note: NoteRepository;
  public question: QuestionRepository;


  private static _current: Repositories = null;
  public static getCurrent = () => {
    if (Repositories._current === null) Repositories._current = new Repositories();
    return Repositories._current;
  }


  constructor() {
    this.answer = new AnswerRepository();
    this.form = new FormRepository();
    this.formSubmission = new FormSubmissionRepository();
    this.note = new NoteRepository();
    this.question = new QuestionRepository();
  }
}
