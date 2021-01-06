import { inject, injectable } from "inversify";
import { TYPES } from "../../constants";
import {
  AnswerRepository,
  FormRepository,
  FormSubmissionRepository,
  NoteRepository,
  QuestionRepository
} from ".";

@injectable()
export class Repositories {
  public answer: AnswerRepository;
  public form: FormRepository;
  public formSubmission: FormSubmissionRepository;
  public note: NoteRepository;
  public question: QuestionRepository;


  constructor(
    @inject(TYPES.AnswerRepository) answerRepository: AnswerRepository,
    @inject(TYPES.FormRepository) formRepository: FormRepository,
    @inject(TYPES.FormSubmissionRepository) formSubmissionRepository: FormSubmissionRepository,
    @inject(TYPES.NoteRepository) noteRepository: NoteRepository,
    @inject(TYPES.QuestionRepository) questionRepository: QuestionRepository,
  ) {
    this.answer = answerRepository;
    this.form = formRepository;
    this.formSubmission = formSubmissionRepository;
    this.note = noteRepository;
    this.question = questionRepository;
  }
}
