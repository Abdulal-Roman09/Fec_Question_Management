export interface TCreateQuestionPayload {
    studentId: string;
    departmentId: string;

    examTitle: string;
    subject: string;
    courseCode?: string;

    examDate?: Date | string;
    duration?: number;

    batch: string;
    semester?: number;
    section?: string;
    year?: number;
    session?: string;
}