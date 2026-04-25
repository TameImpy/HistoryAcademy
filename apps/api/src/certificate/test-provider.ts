import type { CertificateProvider, Certificate } from "./provider.js";

export class TestCertificateProvider implements CertificateProvider {
  private store = new Map<string, Certificate[]>();

  async listCertificates(userId: string): Promise<Certificate[]> {
    return this.store.get(userId) ?? [];
  }

  async generateCertificate(
    userId: string,
    courseSlug: string,
    courseName: string,
    instructor: string,
    userName: string,
  ): Promise<Certificate> {
    const cert: Certificate = {
      certificateId: `cert_${Date.now()}`,
      courseSlug,
      courseName,
      instructor,
      userName,
      completedAt: new Date().toISOString(),
      downloadUrl: `/certificates/cert_${Date.now()}/download`,
    };

    const existing = this.store.get(userId) ?? [];
    existing.push(cert);
    this.store.set(userId, existing);

    return cert;
  }
}
