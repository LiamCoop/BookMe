import { vi, beforeEach } from "vitest"
import { prismaMock } from "./mocks/prisma"
import { mockReset } from "vitest-mock-extended"

vi.mock("@/lib/prisma", () => ({
  prisma: prismaMock,
}))

beforeEach(() => {
  mockReset(prismaMock)
})
