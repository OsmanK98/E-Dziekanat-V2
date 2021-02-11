<?php

declare(strict_types=1);

namespace App\MyApp\Grade\Repositories;

use App\Models\Grade;
use Illuminate\Support\Facades\DB;

class PartialGradeRepository
{
    protected $finalGrade;


    public function __construct(Grade $grade)
    {
        $this->grade = $grade;
    }

    public function getAll()
    {
        return $this->grade->get();
    }

    public function getStudentGrades($id)
    {
        return $this->grade->where('student_id',$id);
    }

    public function getLastGradesStudent($id)
    {
        return $this->getStudentGrades($id)->latest('created_at')->paginate(5);
    }

    public function createGrade($data,$studentId,$subject)
    {
        $grade = new $this->grade;
        $grade->category=$data['category'];
        $grade->value=$data['value'];
        $grade->comments=$data['comments'];
        $grade->student_id=$studentId;
        $grade->save();
        $grade->subjects()->attach($subject);
        return $grade->fresh();
    }

    public function updateGrade($data)
    {
        $this->grade->find($data['id'])->update($data);
    }

    public function getAvgGrades($id)
    {
        return $this->grade->where('student_id',$id)
            ->join('subjects_grades', 'grades.id', '=', 'subjects_grades.grade_id')
            ->join('subjects', 'subjects_grades.subject_id', '=', 'subjects.id')
            ->groupBy('subjects.name','subjects.form')
            ->select('subjects.name','subjects.form', DB::raw('avg(grades.value) as avg'))
            ->get();
    }


}
