import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/course.service';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent implements OnInit {

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
  level:any = null;
  idioma:any = null;
  //who_is_it_for


  constructor(public toaster: Toaster, public courseService: CourseService) { }

  ngOnInit(): void {
    this.isLoading = this.courseService.isLoading$;
    this.courseService.lisConfig().subscribe((resp:any) => {
      this.categories = resp.categories;
      this.subcategories = resp.subcategories;
      this.instructores = resp.instructores;
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

  save(){
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
      !this.file_portada ||
      !this.requirements ||
      !this.what_is_fors){
        this.toaster.open({text: 'Faltan campos por diligenciar', caption: 'Mensaje de validación', type: 'danger'});
        return;
      }

    let formData = new FormData();

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
    formData.append("portada", this.file_portada);
    formData.append("requirements", this.requirements);
    formData.append("who_is_it_for", this.what_is_fors);

    this.courseService.registerCourses(formData).subscribe((resp:any) => {
      if(resp.message == 403){
        this.toaster.open({text: resp.message_text, caption: 'Mensaje de validación', type: 'danger'});
        return;
      }

      if(resp.message == 200){
        this.toaster.open({text: resp.message_text, caption: 'Success', type: 'success'});
        this.title = '';
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
        this.portada_prev = "../../../../assets/media/svg/files/upload.svg";
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

  }



}
