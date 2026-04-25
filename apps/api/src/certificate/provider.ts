export interface Certificate {
  certificateId: string;
  courseSlug: string;
  courseName: string;
  instructor: string;
  userName: string;
  completedAt: string;
  downloadUrl: string;
}

export interface CertificateProvider {
  listCertificates(userId: string): Promise<Certificate[]>;
  generateCertificate(
    userId: string,
    courseSlug: string,
    courseName: string,
    instructor: string,
    userName: string,
  ): Promise<Certificate>;
}
