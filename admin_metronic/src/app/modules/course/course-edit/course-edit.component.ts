import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {

  @Output() private textoEmitido = new EventEmitter<string>();
  //portadaPrev:any = "";
  subcategories:any = [];
  subcategories_back:any = [];
  categories:any = [];
  instructores:any = [];
  file_portada:any = null;
  portada_prev: any = "../../../../assets/media/svg/files/upload.svg";

  isLoading:any;

  text_requirements:any = null;
  requirements:any = [];
  text_what_is_for:any = null;
  what_is_fors:any = [];
  title:string = '';
  subtitle:string = '';
  precio_usd:number = 0;
  precio_co:any = 0;
  description:any = null;
  categorie_id:any = null;
  sub_categorie_id:any = null;
  user_id:any = null;
  level:any = '';
  idioma:any = null;
  //who_is_it_for
  courses_id:any = null;
  course_selected:any = null;
  video_curso:any = null;
  link_video_course:any = null;
  isLoadVideo:boolean = false;

  constructor(
    public toaster: Toaster,
    public courseService: CourseService,
    public activedRoute:ActivatedRoute,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.isLoading = this.courseService.isLoading$;
    this.courseService.lisConfig().subscribe((resp:any) => {
      this.categories = resp.categories;
      this.subcategories = resp.subcategories;
      this.instructores = resp.instructores;

      this.showCourse(this.courses_id);

    })

    this.activedRoute.params.subscribe((resp:any) => {
      this.courses_id = resp.id;
    })

    this.textoEmitido.emit("Editar curso");
  }

  showCourse(id:any){
    this.courseService.showCourse(id).subscribe((resp:any) => {
      this.course_selected = resp.course;
      //console.log(this.course_selected)
      //this.toaster.open({text: resp.message_text, caption: 'Success', type: 'success'});
      this.title = this.course_selected.title;
      this.subtitle = this.course_selected.subtitle;
      this.precio_usd = this.course_selected.precio_usd;
      this.precio_co = this.course_selected.precio_co;
      this.categorie_id = this.course_selected.categorie_id;
      this.sub_categorie_id = this.course_selected.sub_categorie_id;
      this.description = this.course_selected.description;
      this.level = this.course_selected.level;
      this.idioma = this.course_selected.idioma;
      this.user_id = this.course_selected.user_id;
      ///this.file_portada = null;
      this.requirements = this.course_selected.requirements;
      this.what_is_fors = this.course_selected.who_is_it_for;
      this.portada_prev = this.course_selected.imagen;

      if (this.course_selected.vimeo_id) {
        this.link_video_course = "https://player.vimeo.com/video/"+this.course_selected.vimeo_id;
      }

      this.selectCategorie({target: {value: this.categorie_id}});

    })
  }

  selectCategorie(event:any){
    let value = event.target.value;

    this.subcategories_back = this.subcategories.filter((item:any) => item.categorie_id == value);
  }

  addRequirements(){
    if(!this.text_requirements){
      this.toaster.open({text: 'Necesitas ingresar un requerimiento', caption: 'Mensaje de validación', type: 'danger'});
      return;
    }
    this.requirements.push(this.text_requirements);
    this.text_requirements = null;

  }

  removeRequirement(index:number){
    this.requirements.splice(index, 1);
  }

  addWhatIsFor(){
    if(!this.text_what_is_for){
      this.toaster.open({text: 'Necesitas ingresar a quien va dirigido', caption: 'Mensaje de validación', type: 'danger'});
      return;
    }
    this.what_is_fors.push(this.text_what_is_for);
    this.text_what_is_for = null;
  }

  removeWhatIsFor(index:number){
    this.what_is_fors.splice(index, 1);
  }

  public onChange(event: any){
    this.description = event.editor.getData();
  }

  updated(){
    if(!this.title ||
      !this.subtitle ||
      !this.precio_usd ||
      !this.precio_co ||
      !this.categorie_id ||
      !this.sub_categorie_id ||
      !this.description ||
      !this.level ||
      !this.idioma ||
      !this.user_id ||
      !this.requirements ||
      !this.what_is_fors){
        this.toaster.open({text: 'Faltan campos por diligenciar', caption: 'Mensaje de validación', type: 'danger'});
        return;
      }

    let formData = new FormData();
    console.log(this.requirements)
    console.log(this.what_is_fors)
    formData.append("title", this.title);
    formData.append("subtitle", this.subtitle);
    formData.append("precio_usd", this.precio_usd+"");
    formData.append("precio_co", this.precio_co+"");
    formData.append("categorie_id", this.categorie_id);
    formData.append("sub_categorie_id", this.sub_categorie_id);
    formData.append("description", this.description);
    formData.append("level", this.level);
    formData.append("idioma", this.idioma);
    formData.append("user_id", this.user_id);
    if (this.file_portada) {
        formData.append("portada", this.file_portada);
    }
    formData.append("requirements", this.requirements);
    formData.append("who_is_it_for", this.what_is_fors);

    this.courseService.update(formData, this.courses_id).subscribe((resp:any) => {
      if(resp.message == 403){
        this.toaster.open({text: resp.message_text, caption: 'Mensaje de validación', type: 'danger'});
        return;
      }

      if(resp.message == 200){
        this.toaster.open({text: resp.message_text, caption: 'Acción exitosa', type: 'success'});
        /*this.title = '';
        this.subtitle = '';
        this.precio_usd = 0;
        this.precio_co = 0;
        this.categorie_id = null;
        this.sub_categorie_id = null;
        this.description = '';
        this.level = null;
        this.idioma = null;
        this.user_id = null;
        this.file_portada = null;
        this.requirements = [];
        this.what_is_fors = [];
        this.portada_prev = "../../../../assets/media/svg/files/upload.svg";*/
        return;
      }
    });

  }

  processPortada($event:any){
    if ($event.target.files[0].type.indexOf("image") < 0) {
      this.toaster.open({text: 'Solamente se aceptan imagenes', caption: 'Mensaje de validación', type: 'danger'});
      return;
    }

    this.file_portada = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.file_portada);
    reader.onloadend = () => this.portada_prev = reader.result;
    this.courseService.isLoadingSubject.next(true);
    setTimeout(() => {
      this.courseService.isLoadingSubject.next(false);
    }, 50);

    console.log(this.file_portada)
  }

  urlVideo(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.link_video_course);
  }

  processVideo($event:any){
    if ($event.target.files[0].type.indexOf("video") < 0) {
      this.toaster.open({text: 'Solamente se aceptan videos', caption: 'Mensaje de validación', type: 'danger'});
      return;
    }
    console.log($event.target.files[0])
    this.video_curso = $event.target.files[0];
  }

  uploadVideo(){
    let formData = new FormData();
    formData.append("video",this.video_curso);

    this.isLoadVideo = true;

    this.courseService.uploadVideo(formData, this.courses_id).subscribe((resp:any) => {

      this.isLoadVideo = false;
      this.link_video_course = resp.link_video;
      this.toaster.open({text: resp.message_text, caption: 'Acción exitosa', type: resp.tipo });

    })
  }
}
