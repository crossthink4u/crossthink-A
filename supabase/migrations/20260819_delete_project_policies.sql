-- ============================================================
-- Let owners delete a project's applications along with it.
--
-- projects already has "Owners can delete their projects", and
-- project_members cascades via its FK. applications does not:
-- project_id is plain text with no FK, and there was no DELETE
-- policy at all — so deleting a project silently orphaned every
-- application attached to it.
-- ============================================================

DROP POLICY IF EXISTS "Project owners can delete applications" ON public.applications;

CREATE POLICY "Project owners can delete applications"
  ON public.applications FOR DELETE
  USING (
    project_id IN (
      SELECT id::text FROM public.projects WHERE owner_id = auth.uid()
    )
  );

-- Applicants can withdraw their own application.
DROP POLICY IF EXISTS "Applicants can delete their own applications" ON public.applications;

CREATE POLICY "Applicants can delete their own applications"
  ON public.applications FOR DELETE
  USING (applicant_user_id = auth.uid());
