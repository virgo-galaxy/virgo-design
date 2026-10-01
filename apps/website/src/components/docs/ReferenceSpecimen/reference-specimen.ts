import {
  ReferenceSpecimenCaption,
  ReferenceSpecimenRoot,
  ReferenceSpecimenStage,
  ReferenceSpecimenToolbar,
} from './ReferenceSpecimen';

/** Website reference composition; interactive specimen content owns its behavior. */
export const ReferenceSpecimen = Object.assign(ReferenceSpecimenRoot, {
  Toolbar: ReferenceSpecimenToolbar,
  Stage: ReferenceSpecimenStage,
  Caption: ReferenceSpecimenCaption,
});
