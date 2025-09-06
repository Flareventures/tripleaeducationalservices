export type Artifact = { id:string; ts:number; studentId:string; payload:any };

export interface ArtifactBackend {
  saveArtifact(a:Artifact): Promise<void>;
  getArtifactsByStudent(studentId:string, limit?:number): Promise<Artifact[]>;
}

// Local (in-memory) backend
const mem: Artifact[] = [];
export const LocalBackend: ArtifactBackend = {
  async saveArtifact(a){ mem.unshift(a); },
  async getArtifactsByStudent(id, limit=50){ return mem.filter(x=>x.studentId===id).slice(0,limit); }
};

export let Active: ArtifactBackend = LocalBackend;

export async function initBackend(kind:'local'|'firebase'|'supabase'){
  if(kind==='firebase'){
    try{
      const fb = await import('./firebase');
      Active = {
        async saveArtifact(a){ await fb.fbSaveArtifact(a); },
        async getArtifactsByStudent(id, limit=50){ return await fb.fbGetArtifactsByStudent(id, limit); }
      };
      return 'firebase';
    }catch(e){
      console.warn('[Backend] Firebase not configured, falling back to Local. Reason:', (e as any)?.message || e);
      Active = LocalBackend;
      return 'local-fallback';
    }
  }else if(kind==='supabase'){
    try{
      const { supabase } = await import('./supabase');
      Active = {
        async saveArtifact(a){ await supabase.from('artifacts').insert(a as any); },
        async getArtifactsByStudent(id, limit=50){ const { data } = await supabase.from('artifacts').select('*').eq('studentId', id).order('ts', {ascending:false}).limit(limit); return (data||[]) as Artifact[]; }
      };
      return 'supabase';
    }catch(e){
      console.warn('[Backend] Supabase not configured, falling back to Local.'); Active = LocalBackend; return 'local-fallback';
    }
  }else{
    Active = LocalBackend;
    return 'local';
  }
}
